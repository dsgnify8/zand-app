import { useState } from 'react';
import { Image, LayoutChangeEvent, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useFrame } from '@/lib/image-frames';
import { isAdmin } from '@/lib/admin';
import { ReframeEditor } from '@/components/reframe-editor';

// Fills the box with the image (cover, no distortion), then nudges it so the
// chosen focal point sits in view, optionally zoomed in.
export function FramedImage({
  name, source, style, children, editable = true, onPress,
}: {
  name: string;
  source?: ImageSourcePropType;
  style?: any;
  children?: any;
  editable?: boolean;
  onPress?: () => void;
}) {
  const frame = useFrame(name);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [imgAR, setImgAR] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setBox({ w: width, h: height });
  };

  const [uriBad, setUriBad] = useState(false);
  const src: ImageSourcePropType | undefined = (frame.uri && !uriBad) ? { uri: frame.uri } : source;

  // resolve the image aspect ratio so we can cover-fill precisely
  if (imgAR === null && src) {
    if (frame.uri) {
      Image.getSize(frame.uri, (w, h) => setImgAR(w / h), () => { setImgAR(1); setUriBad(true); });
    } else if (source) {
      const r = Image.resolveAssetSource(source as any);
      if (r?.width && r?.height) setImgAR(r.width / r.height);
      else setImgAR(1);
    }
  }

  let inner = null;
  if (src && box.w > 0 && imgAR) {
    const boxAR = box.w / box.h;
    // cover-fill: scale so the image covers the box on its tighter axis
    let dispW: number, dispH: number;
    if (imgAR > boxAR) { dispH = box.h; dispW = box.h * imgAR; }
    else { dispW = box.w; dispH = box.w / imgAR; }
    dispW *= frame.zoom; dispH *= frame.zoom;

    // overflow beyond the box, shifted by focal point
    const overX = dispW - box.w;
    const overY = dispH - box.h;
    const tx = (0.5 - frame.fx) * overX;
    const ty = (0.5 - frame.fy) * overY;

    inner = (
      <Image
        source={src}
        style={{ width: dispW, height: dispH, transform: [{ translateX: tx }, { translateY: ty }] }}
        resizeMode="stretch"
      />
    );
  }

  return (
    <>
      <Pressable
        style={style}
        onLayout={onLayout}
        onPress={onPress}
        onLongPress={() => { if (isAdmin() && editable) setEditing(true); }}
        delayLongPress={340}
      >
        <View style={[StyleSheet.absoluteFill as any, { alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: inner ? 'transparent' : 'rgba(36,28,25,0.06)' }]}>
          {inner}
          {!inner && isAdmin() ? (
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Ionicons name="add-circle-outline" size={22} color="rgba(36,28,25,0.4)" />
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 9, letterSpacing: 1, color: 'rgba(36,28,25,0.4)' }}>HOLD TO ADD</Text>
            </View>
          ) : null}
        </View>
        {children}
      </Pressable>

      {editing ? <ReframeEditor name={name} source={source} onClose={() => setEditing(false)} /> : null}
    </>
  );
}

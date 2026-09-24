import { useRef, useState, useEffect } from 'react';
import { Image, LayoutChangeEvent, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
// Drawing is expo-image's job; the RN one is kept only for
// resolveAssetSource, which reads a bundled asset's size without a
// network request.
import { Image as Img } from 'expo-image';

import { Ionicons } from '@expo/vector-icons';
import { useFrame } from '@/lib/image-frames';
import { isAdmin } from '@/lib/admin';
import { ReframeEditor } from '@/components/reframe-editor';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

// Fills the box with the image (cover, no distortion), then nudges it so the
// chosen focal point sits in view, optionally zoomed in.
export function FramedImage({
  name, source, style, children, editable = true, onPress, fit = 'cover',
}: {
  name: string;
  source?: ImageSourcePropType;
  /** How the image meets its box. Cover fills it and crops the overflow,
   *  which is right for a photograph. Contain fits the whole image in,
   *  which is the only correct choice for a map — a cropped map has lost
   *  the part that was being pointed at. */
  fit?: 'cover' | 'contain';
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

  // Resolve the image aspect ratio so we can cover-fill precisely.
  // This has to happen in an effect: setting state during render leaves the
  // value stale, and a stale ratio with resizeMode stretch distorts the image.
  // Asked once per source. The failure path used to set imgAR back to
  // null while imgAR was a dependency, so a URL that could not be
  // measured re-ran the effect, failed, and re-ran again — a loop that
  // locked the screen on any card whose photograph was missing.
  const asked = useRef<string | null>(null);
  useEffect(() => {
    if (!src) return;
    const id = frame.uri ?? 'asset';
    if (asked.current === id) return;
    asked.current = id;

    if (frame.uri) {
      // Nothing to do here. A remote picture reports its size through
      // onLoad below, which arrives with the download we are making
      // anyway — Image.getSize fetched the whole file a second time,
      // before the one that gets drawn had even started.
    } else if (source) {
      const r = Image.resolveAssetSource(source as any);
      if (r?.width && r?.height) setImgAR(r.width / r.height);
    }
  }, [src, frame.uri]);

  // The picture reports its own proportions once it is here.
  const onLoad = (e: any) => {
    const w = e?.source?.width, h = e?.source?.height;
    if (w && h) setImgAR(w / h);
  };

  let inner = null;
  if (src && box.w > 0 && !imgAR) {
    // ratio not known yet: fill the box properly rather than distorting
    inner = (
      <Img
        source={src}
        style={StyleSheet.absoluteFill as any}
        contentFit={fit}
        cachePolicy="memory-disk"
        transition={120}
        onLoad={onLoad}
        onError={() => { if (frame.uri) setUriBad(true); }}
      />
    );
  } else if (src && box.w > 0 && imgAR) {
    const boxAR = box.w / box.h;
    // Cover scales to the tighter axis so the box is filled and the
    // rest overflows; contain scales to the looser one so all of it
    // fits. Same calculation, opposite comparison.
    let dispW: number, dispH: number;
    const wide = fit === 'contain' ? imgAR < boxAR : imgAR > boxAR;
    if (wide) { dispH = box.h; dispW = box.h * imgAR; }
    else { dispW = box.w; dispH = box.w / imgAR; }
    dispW *= frame.zoom; dispH *= frame.zoom;

    // overflow beyond the box, shifted by focal point
    const overX = dispW - box.w;
    const overY = dispH - box.h;
    const tx = (0.5 - frame.fx) * overX;
    const ty = (0.5 - frame.fy) * overY;

    inner = (
      <Img
        source={src}
        style={{ width: dispW, height: dispH, transform: [{ translateX: tx }, { translateY: ty }] }}
        contentFit="fill"
        cachePolicy="memory-disk"
        transition={120}
        onLoad={onLoad}
        onError={() => { if (frame.uri) setUriBad(true); }}
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
              <Text style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 9, letterSpacing: 1, color: 'rgba(36,28,25,0.4)' }}>{t(APP.holdToAdd)}</Text>
            </View>
          ) : null}
        </View>
        {children}
      </Pressable>

      {editing ? <ReframeEditor name={name} source={source} onClose={() => setEditing(false)} /> : null}
    </>
  );
}

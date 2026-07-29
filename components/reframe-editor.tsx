import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { fonts, spacing } from '@/constants/zand-theme';
import { ar } from '@/constants/articles';
import { getFrame, saveFrame, clearFrame } from '@/lib/image-frames';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

const FRAME_W = 320;
const FRAME_H = 240;

function useImageSize(source?: ImageSourcePropType, uri?: string) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    let alive = true;
    if (uri) Image.getSize(uri, (w, h) => alive && setSize({ w, h }), () => alive && setSize({ w: 4, h: 3 }));
    else if (source) {
      const r = Image.resolveAssetSource(source as any);
      setSize(r?.width && r?.height ? { w: r.width, h: r.height } : { w: 4, h: 3 });
    } else setSize(null);
    return () => { alive = false; };
  }, [uri, source]);
  return size;
}

export function ReframeEditor({ name, source, onClose }: { name: string; source?: ImageSourcePropType; onClose: () => void }) {
  const start = getFrame(name);
  const [uri, setUri] = useState<string | undefined>(start.uri);
  const size = useImageSize(source, uri);
  const src: ImageSourcePropType | undefined = uri ? { uri } : source;

  // cover-fill base size for the 320x240 preview
  let baseW = FRAME_W, baseH = FRAME_H;
  if (size) {
    const imgAR = size.w / size.h;
    const frameAR = FRAME_W / FRAME_H;
    if (imgAR > frameAR) { baseH = FRAME_H; baseW = FRAME_H * imgAR; }
    else { baseW = FRAME_W; baseH = FRAME_W / imgAR; }
  }

  const zoom = useSharedValue(start.zoom || 1);
  const fx = useSharedValue(start.fx ?? 0.5);
  const fy = useSharedValue(start.fy ?? 0.5);
  const gZoom = useSharedValue(1);
  const gfx = useSharedValue(0.5);
  const gfy = useSharedValue(0.5);

  useEffect(() => { if (size) { zoom.value = 1; fx.value = 0.5; fy.value = 0.5; } }, [size?.w, size?.h, uri]);

  const pan = Gesture.Pan()
    .onStart(() => { gfx.value = fx.value; gfy.value = fy.value; })
    .onUpdate((e) => {
      const dispW = baseW * zoom.value;
      const dispH = baseH * zoom.value;
      const overX = Math.max(1, dispW - FRAME_W);
      const overY = Math.max(1, dispH - FRAME_H);
      fx.value = Math.min(1, Math.max(0, gfx.value - e.translationX / overX));
      fy.value = Math.min(1, Math.max(0, gfy.value - e.translationY / overY));
    });

  const pinch = Gesture.Pinch()
    .onStart(() => { gZoom.value = zoom.value; })
    .onUpdate((e) => { zoom.value = Math.min(4, Math.max(1, gZoom.value * e.scale)); });

  const gesture = Gesture.Simultaneous(pan, pinch);

  const imgStyle = useAnimatedStyle(() => {
    const dispW = baseW * zoom.value;
    const dispH = baseH * zoom.value;
    const overX = dispW - FRAME_W;
    const overY = dispH - FRAME_H;
    const tx = (0.5 - fx.value) * overX;
    const ty = (0.5 - fy.value) * overY;
    return { width: dispW, height: dispH, transform: [{ translateX: tx }, { translateY: ty }] };
  });

  const upload = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 1 });
      if (!res.canceled && res.assets?.[0]) {
        // The picker hands back a cache path, and iOS clears that cache within
        // days. Copy it into the documents directory, which is permanent.
        const picked = res.assets[0].uri;
        try {
          const dir = (FileSystem.documentDirectory ?? '') + 'frames/';
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true }).catch(() => {});
          const ext = (picked.split('.').pop() || 'jpg').split('?')[0].toLowerCase();
          const safe = ['jpg', 'jpeg', 'png', 'webp', 'heic'].includes(ext) ? ext : 'jpg';
          const dest = dir + name.replace(/[^a-z0-9-]/gi, '_') + '-' + Date.now() + '.' + safe;
          await FileSystem.copyAsync({ from: picked, to: dest });
          setUri(dest);
        } catch {
          // if the copy fails, fall back rather than losing the pick entirely
          setUri(picked);
        }
      }
    } catch {}
  };

  const save = async () => {
    await saveFrame(name, { fx: fx.value, fy: fy.value, zoom: zoom.value, uri });
    onClose();
  };

  const reset = async () => {
    await clearFrame(name);
    setUri(undefined);
    zoom.value = 1; fx.value = 0.5; fy.value = 0.5;
  };

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
          <View style={s.head}>
            <Pressable hitSlop={10} onPress={onClose}><Ionicons name="close" size={24} color="rgba(255,255,255,0.85)" /></Pressable>
            <Text style={s.title}>{t(APP.reframe)}</Text>
            <View style={{ width: 24 }} />
          </View>

          <Text style={s.hint}>Drag to position, pinch to zoom. What sits inside the frame is exactly what everyone sees.</Text>

          <View style={s.stage}>
            <View style={s.frame}>
              <GestureDetector gesture={gesture}>
                <View style={s.center}>
                  {src ? <Animated.Image source={src} style={imgStyle} resizeMode="stretch" />
                       : <Ionicons name="image-outline" size={26} color="rgba(255,255,255,0.5)" />}
                </View>
              </GestureDetector>
              <View style={s.gridV} pointerEvents="none" />
              <View style={s.gridH} pointerEvents="none" />
            </View>
          </View>

          <View style={s.actions}>
            <Pressable style={s.action} onPress={upload}>
              <Ionicons name="cloud-upload-outline" size={17} color={ar.ink} />
              <Text style={s.actionT}>{t(APP.upload)}</Text>
            </Pressable>
            <Pressable style={s.action} onPress={reset}>
              <Ionicons name="refresh-outline" size={17} color={ar.ink} />
              <Text style={s.actionT}>{t(APP.reset)}</Text>
            </Pressable>
          </View>

          <Pressable style={s.saveBtn} onPress={save}>
            <Ionicons name="checkmark" size={18} color="#241C19" />
            <Text style={s.saveT}>{t(APP.saveFraming)}</Text>
          </Pressable>

          <Text style={s.note}>Everyone will see it this way. Editing {name}</Text>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(12,10,8,0.94)' },
  safe: { flex: 1 },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: 19, color: '#FFF' },
  hint: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 18, color: 'rgba(255,255,255,0.6)', textAlign: 'center', paddingHorizontal: spacing.xl, marginBottom: spacing.xl },
  stage: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  frame: { width: FRAME_W, height: FRAME_H, borderRadius: 12, overflow: 'hidden', backgroundColor: '#1A1512', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  gridV: { position: 'absolute', left: '33.33%', right: '33.33%', top: 0, bottom: 0, borderLeftWidth: 1, borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  gridH: { position: 'absolute', top: '33.33%', bottom: '33.33%', left: 0, right: 0, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  actions: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, marginTop: spacing.lg },
  action: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#FFF', borderRadius: 12, paddingVertical: spacing.md },
  actionT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: ar.ink },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#E0C079', borderRadius: 14, paddingVertical: spacing.md, marginHorizontal: spacing.lg, marginTop: spacing.md },
  saveT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#241C19' },
  note: { fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginVertical: spacing.md },
});

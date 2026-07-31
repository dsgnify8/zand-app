// A tulip field, drawn rather than photographed.
//
// In Persian tradition the red tulip is the flower of a life given: it grows
// where blood was spilled, it appears on the Shahnameh's battlefields, and it
// is the flower laid at graves. Some heads here are still standing. Most are
// not.

import Svg, { Circle, G, Path } from 'react-native-svg';

export function TulipField({ ink, faint, accent }: { ink: string; faint: string; accent: string }) {
  return (
    <Svg width="100%" height={300} viewBox="0 0 300 300">
      {/* ground line, broken rather than ruled */}
      <Path d="M18 272 C60 269 92 274 128 271 C168 268 206 274 246 270 C262 269 274 271 284 270"
        stroke={faint} strokeWidth={1} fill="none" />

      {/* --- a tall stem, head still upright --- */}
      <G>
        <Path d="M150 272 C150 224 149 190 150 150" stroke={ink} strokeWidth={1.6} fill="none" strokeLinecap="round" />
        {/* long blade leaves */}
        <Path d="M150 236 C126 226 114 206 112 180 C132 190 146 210 150 236 Z" stroke={ink} strokeWidth={1.2} fill="none" />
        <Path d="M150 214 C172 204 186 186 188 164 C170 172 156 190 150 214 Z" stroke={faint} strokeWidth={1.1} fill="none" />
        {/* the cup: three front petals, two behind */}
        <Path d="M150 150 C136 148 128 136 128 120 C128 106 136 96 150 94 C164 96 172 106 172 120 C172 136 164 148 150 150 Z"
          stroke={ink} strokeWidth={1.5} fill="none" />
        <Path d="M150 94 C142 100 138 110 138 122 C138 134 142 144 150 150" stroke={faint} strokeWidth={1.1} fill="none" />
        <Path d="M150 94 C158 100 162 110 162 122 C162 134 158 144 150 150" stroke={faint} strokeWidth={1.1} fill="none" />
        <Path d="M132 112 C126 100 128 90 136 84 C140 92 138 104 132 112 Z" stroke={faint} strokeWidth={1} fill="none" />
        <Path d="M168 112 C174 100 172 90 164 84 C160 92 162 104 168 112 Z" stroke={faint} strokeWidth={1} fill="none" />
      </G>

      {/* --- a shorter stem, head beginning to bow --- */}
      <G>
        <Path d="M84 272 C84 236 82 212 90 190 C94 178 100 170 108 164" stroke={ink} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        <Path d="M86 240 C68 232 58 216 58 196 C74 204 84 220 86 240 Z" stroke={faint} strokeWidth={1.1} fill="none" />
        <Path d="M108 164 C98 158 94 148 98 136 C104 126 116 122 126 128 C134 134 136 146 130 156 C124 164 116 168 108 164 Z"
          stroke={ink} strokeWidth={1.4} fill="none" />
        <Path d="M112 130 C110 140 112 152 118 160" stroke={faint} strokeWidth={1} fill="none" />
        <Path d="M124 128 C126 138 124 150 120 158" stroke={faint} strokeWidth={1} fill="none" />
      </G>

      {/* --- a stem broken at the middle, head hanging --- */}
      <G>
        <Path d="M216 272 C216 240 218 218 220 200" stroke={ink} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        {/* the break */}
        <Path d="M220 200 C224 196 226 194 224 190" stroke={ink} strokeWidth={1.4} fill="none" />
        <Path d="M224 190 C230 194 236 202 238 214 C240 226 238 236 232 244" stroke={ink} strokeWidth={1.5} fill="none" strokeLinecap="round" />
        <Path d="M218 232 C236 226 248 212 250 194 C234 200 222 214 218 232 Z" stroke={faint} strokeWidth={1.1} fill="none" />
        {/* head hanging downward */}
        <Path d="M232 244 C240 246 246 254 246 264 C246 274 240 282 232 284 C224 282 218 274 218 264 C218 254 224 246 232 244 Z"
          stroke={ink} strokeWidth={1.4} fill="none" />
        <Path d="M232 244 C227 250 225 258 226 266" stroke={faint} strokeWidth={1} fill="none" />
        <Path d="M232 244 C237 250 239 258 238 266" stroke={faint} strokeWidth={1} fill="none" />
      </G>

      {/* --- two bare stems, heads gone entirely --- */}
      <Path d="M52 272 C52 246 50 228 46 214" stroke={faint} strokeWidth={1.3} fill="none" strokeLinecap="round" />
      <Path d="M266 272 C266 250 268 234 272 220" stroke={faint} strokeWidth={1.3} fill="none" strokeLinecap="round" />

      {/* --- fallen petals on the ground --- */}
      <Path d="M62 264 C70 256 82 256 88 264 C80 271 68 271 62 264 Z" stroke={faint} strokeWidth={1.1} fill="none" />
      <Path d="M104 270 C110 264 120 264 124 270 C118 275 110 275 104 270 Z" stroke={faint} strokeWidth={1} fill="none" />
      <Path d="M176 266 C184 258 196 258 202 266 C194 273 182 273 176 266 Z" stroke={faint} strokeWidth={1.1} fill="none" />
      <Path d="M254 268 C260 262 270 262 274 268 C268 273 260 273 254 268 Z" stroke={faint} strokeWidth={1} fill="none" />
      <Path d="M30 268 C36 262 46 262 50 268 C44 273 36 273 30 268 Z" stroke={faint} strokeWidth={1} fill="none" />
      <Path d="M140 274 C146 268 156 268 160 274 C154 279 146 279 140 274 Z" stroke={faint} strokeWidth={1} fill="none" />

      {/* a single seed head, gone to nothing */}
      <Circle cx="46" cy="210" r="3" stroke={faint} strokeWidth={1} fill="none" />
      <Path d="M42 206 L38 200 M50 206 L54 200 M46 205 L46 198" stroke={faint} strokeWidth={0.9} strokeLinecap="round" />
    </Svg>
  );
}

// A single rose, head bowed. Drawn as a pencil study rather than a diagram:
// a long curved stem, the neck given way near the top, the head hanging
// closed, one leaf drooping, petals loosening at the edge.

import Svg, { G, Path } from 'react-native-svg';

export function DroopingRose({
  ink,
  faint,
  blush,
}: {
  ink: string;
  faint: string;
  blush: string;
}) {
  return (
    <Svg width="100%" height={300} viewBox="0 0 300 300">
      {/* ---------------- stem ---------------- */}
      {/* rises from lower left, leans right, then the neck folds over */}
      <Path
        d="M112 292 C118 254 126 216 134 182 C139 160 143 142 146 128 C148 116 149 106 147 98"
        stroke={ink}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      {/* a second, lighter line just inside it: pencil weight */}
      <Path
        d="M116 290 C122 252 130 214 138 180 C143 158 147 141 150 127"
        stroke={faint}
        strokeWidth={0.8}
        fill="none"
        strokeLinecap="round"
      />

      {/* the neck: over the top and back down */}
      <Path
        d="M147 98 C146 88 150 80 160 76 C172 71 186 74 194 84"
        stroke={ink}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />

      {/* ---------------- sepals ---------------- */}
      {/* splayed where the head meets the neck, one curling up */}
      <Path d="M194 84 C204 74 214 70 224 72" stroke={ink} strokeWidth={1.1} fill="none" strokeLinecap="round" />
      <Path d="M192 86 C200 78 206 68 205 58" stroke={ink} strokeWidth={1.1} fill="none" strokeLinecap="round" />
      <Path d="M186 84 C182 74 176 68 168 66" stroke={faint} strokeWidth={1} fill="none" strokeLinecap="round" />
      <Path d="M198 88 C208 86 218 88 224 94" stroke={faint} strokeWidth={1} fill="none" strokeLinecap="round" />

      {/* ---------------- the head ---------------- */}
      <G>
        {/* outer silhouette, hanging closed */}
        <Path
          d="M182 88
             C168 96 162 114 165 134
             C168 154 180 170 196 174
             C214 178 230 166 236 146
             C242 126 238 104 226 92
             C214 82 194 82 182 88 Z"
          stroke={ink}
          strokeWidth={1.4}
          fill="none"
          strokeLinejoin="round"
        />

        {/* front petal, the one that has opened away from the rest */}
        <Path
          d="M186 96 C176 110 174 132 180 150 C186 166 198 174 210 172"
          stroke={ink}
          strokeWidth={1.2}
          fill="none"
        />
        {/* its loosening edge */}
        <Path d="M180 150 C174 154 168 156 162 154" stroke={faint} strokeWidth={0.9} fill="none" strokeLinecap="round" />

        {/* inner petals, folded over one another */}
        <Path d="M198 90 C192 106 191 128 196 146 C200 160 208 170 218 172" stroke={faint} strokeWidth={1} fill="none" />
        <Path d="M212 88 C210 106 212 128 218 144 C222 156 228 164 234 166" stroke={faint} strokeWidth={1} fill="none" />
        <Path d="M224 94 C226 110 228 128 232 142" stroke={faint} strokeWidth={0.85} fill="none" />

        {/* the tip, where the petals close and darken */}
        <Path
          d="M186 152 C192 168 204 178 218 176 C228 174 234 166 236 156"
          stroke={blush}
          strokeWidth={1.3}
          fill="none"
          strokeLinecap="round"
        />
        <Path d="M194 162 C200 170 208 174 216 174" stroke={blush} strokeWidth={0.9} fill="none" strokeLinecap="round" />
        <Path d="M204 168 C210 172 216 173 222 172" stroke={blush} strokeWidth={0.75} fill="none" strokeLinecap="round" />

        {/* a petal that has come away and is about to fall */}
        <Path
          d="M236 148 C246 148 254 156 254 166 C254 176 246 184 236 184"
          stroke={faint}
          strokeWidth={1}
          fill="none"
        />
      </G>

      {/* ---------------- leaf ---------------- */}
      {/* drooping from the stem, folded along its spine */}
      <Path
        d="M138 178
           C120 176 104 186 96 202
           C90 214 92 228 100 236
           C114 230 128 214 136 196
           C138 190 139 184 138 178 Z"
        stroke={ink}
        strokeWidth={1.2}
        fill="none"
        strokeLinejoin="round"
      />
      <Path d="M138 178 C126 192 114 210 100 236" stroke={faint} strokeWidth={0.85} fill="none" />
      <Path d="M130 190 C124 192 118 196 114 202" stroke={faint} strokeWidth={0.7} fill="none" />
      <Path d="M122 204 C116 206 110 210 106 216" stroke={faint} strokeWidth={0.7} fill="none" />

      {/* a smaller leaf lower down, mostly gone */}
      <Path d="M124 244 C114 246 106 254 104 264" stroke={faint} strokeWidth={0.9} fill="none" strokeLinecap="round" />

      {/* ---------------- thorns ---------------- */}
      <Path d="M130 208 L138 202" stroke={ink} strokeWidth={1} fill="none" strokeLinecap="round" />
      <Path d="M120 258 L112 252" stroke={faint} strokeWidth={0.9} fill="none" strokeLinecap="round" />

      {/* ---------------- fallen petals ---------------- */}
      <Path
        d="M198 246 C206 238 220 238 226 246 C220 254 206 254 198 246 Z"
        stroke={faint}
        strokeWidth={0.95}
        fill="none"
      />
      <Path d="M204 248 C210 244 216 244 220 248" stroke={blush} strokeWidth={0.7} fill="none" />

      <Path
        d="M232 268 C240 262 250 262 256 268 C250 275 240 275 232 268 Z"
        stroke={faint}
        strokeWidth={0.9}
        fill="none"
      />
      <Path
        d="M164 274 C170 268 180 268 184 274 C178 280 170 280 164 274 Z"
        stroke={faint}
        strokeWidth={0.85}
        fill="none"
      />
      <Path d="M254 240 C260 236 268 237 270 242" stroke={faint} strokeWidth={0.75} fill="none" strokeLinecap="round" />
    </Svg>
  );
}

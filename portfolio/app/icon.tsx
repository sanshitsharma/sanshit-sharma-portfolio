import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 20,
          background: '#020617', // Match your bg-slate-950
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#22d3ee', // Match your text-cyan-400
          borderRadius: '8px',
          fontWeight: 800,
          border: '2px solid #1e293b', // Slight border
        }}
      >
        S
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
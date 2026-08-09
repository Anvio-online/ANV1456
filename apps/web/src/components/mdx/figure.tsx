import Image from 'next/image'

/**
 * content-layer.md §2 whitelist. Wraps next/image with a real
 * <figcaption> — explicit width/height so it reserves space and can't
 * cause layout shift (motion-system.md §6.6), and next/image handles
 * AVIF/WebP + lazy-loading below the fold automatically.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="border-border-soft w-full rounded-lg border"
      />
      {caption ? (
        <figcaption className="text-label text-text-3 mt-2 text-center">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

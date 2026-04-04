export function DecorativeBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -right-24 md:-top-40 md:-right-40 lg:-top-60 lg:-right-60 w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-terracota-100 rounded-full filter blur-3xl opacity-20 md:opacity-30 animate-blob" />
      <div className="absolute -bottom-24 -left-24 md:-bottom-40 md:-left-40 lg:-bottom-60 lg:-left-60 w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20 md:opacity-30 animate-blob animation-delay-2000" />
    </div>
  )
}


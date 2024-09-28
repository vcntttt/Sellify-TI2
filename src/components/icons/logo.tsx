export default function logo({ className }: { className?: string }) {
  return (
    <img src="/logo.svg" alt="logo" width="100" height="100" className={className} />
  )
}

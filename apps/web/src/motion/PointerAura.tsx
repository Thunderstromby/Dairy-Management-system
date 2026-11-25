type PointerAuraProps = {
  className?: string;
};

export function PointerAura({ className = '' }: PointerAuraProps) {
  return <div aria-hidden="true" className={`sf-pointer-aura ${className}`.trim()} />;
}

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Reusable layout container.
 * Constrains content width and adds consistent horizontal padding.
 * Wrap any section's inner content with this.
 *
 * Usage:
 *   <Container>...</Container>
 *   <Container as="section" className="py-20">...</Container>
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}

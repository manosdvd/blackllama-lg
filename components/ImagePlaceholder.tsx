export default function ImagePlaceholder({ description, className = "" }: { description: string, className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-pine-900 border-2 border-dashed border-pine-700 text-cream p-4 text-center text-sm font-semibold rounded ${className}`}>
      <span>[Placeholder: {description}]</span>
    </div>
  );
}

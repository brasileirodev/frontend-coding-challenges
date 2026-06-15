export const Item = ({ label, value }: { label?: string; value: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    {label && (
      <p className="font-decorative text-base leading-[1.3] font-normal tracking-normal text-[#53524F]">
        {label}
      </p>
    )}
    <p className="font-decorative text-base leading-[1.3] font-normal tracking-normal text-[#F1DBB5]">
      {value}
    </p>
  </div>
);

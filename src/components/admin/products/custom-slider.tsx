import { Slider } from "@/components/ui/slider";
type Props = {
  value: number;
  onChange: (value: number) => void;
};
export default function CustomSlider({ value, onChange }: Props) {
  return (
    <Slider
      min={0}
      max={100}
      defaultValue={[value || 0]}
      step={5}
      onValueChange={(vals) => onChange(vals[0])}
    />
  );
}

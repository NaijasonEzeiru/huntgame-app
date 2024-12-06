import { ToggleGroupItem } from "../ui/toggle-group";

const Card = ({
  top,
  middle,
  bottom,
  value,
}: {
  top: string;
  middle: string;
  value: string;
  bottom?: string;
}) => {
  return (
    <ToggleGroupItem value={value} aria-label="Toggle bold" className="h-full">
      <div className="bg-[#6F084C] rounded-[10px] pt-7 pb-5 w-32 shrink-0 flex flex-col justify-between items-center h-40 xl:w-44 xl:h-72">
        <p>{top}</p>
        <p>{middle}</p>
        {bottom && <p className="text-[#B18409]">{bottom}</p>}
      </div>
    </ToggleGroupItem>
  );
};

export default Card;

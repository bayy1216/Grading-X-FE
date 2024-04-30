import {Button} from "@/components/ui/button.tsx";

export const GreenButton = (props: { children: React.ReactNode, onClick?: ()=>void}) => {
  return (
    <Button
      className="border-buttonGreenBorder bg-buttonGreen
         text-white hover:text-white hover:bg-[#38996b]/80 focus:ring-[#3ecf8e]"
      variant="outline"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
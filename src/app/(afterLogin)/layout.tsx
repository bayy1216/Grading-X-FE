import RQProvider from "@/component/RQProvider";

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({children} : Props){
  return (
    <RQProvider>
      {children}
    </RQProvider>
  );
}
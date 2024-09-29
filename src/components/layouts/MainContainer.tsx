import React, { ReactNode } from "react";
export interface MainContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  children?: ReactNode;
}
const MainContainer = (props: MainContainerProps) => {
  return (
    <div className="w-full relative h-auto overflow-y-hidden overflow-x-hidden">
      <main
        className={`flex relative z-10 min-h-screen max-w-[1280px] mx-auto w-full lg:pb-10 lg:pt-8 pb-4 lg:px-10 pt-5 px-5 flex-col items-center ${props.className} `}
      >
        {props.children}
      </main>
    </div>
  );
};

export default MainContainer;

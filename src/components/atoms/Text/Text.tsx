import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import { HTMLProps } from "react";
import { TextProps } from "./Text.types";

const textStyles = cva("", {
  variants: {
    variant: {
      body800: "md:text-[44px]",
      body700: "md:text-[32px]",
      body600: "md:text-[24px]",
      body500: "md:text-[20px]",
      body450: "md:text-[18px]",
      body400: "md:text-[16px]",
      body300: "md:text-[14px]",
      body200: "md:text-[12px]",
      body100: "md:text-[10px]",
    },
    variantMobile: {
      body800: "text-[44px]",
      body700: "text-[32px]",
      body600: "text-[24px]",
      body500: "text-[20px]",
      body450: "text-[18px]",
      body400: "text-[16px]",
      body300: "text-[14px]",
      body200: "text-[12px]",
      body100: "text-[10px]",
    },
    // fontFamily: {
    //   inter: "font-inter",
    // },
    // fontColor: {
    //   black: "text-black-950",
    //   grey: "text-grey-700",
    // },
  },

  defaultVariants: {
    variant: "body400",
    // fontColor: "grey",
  },
});

const Text = ({
  variant,
  variantMobile,
  // fontColor,
  // fontFamily,
  className,
  children,
  ...props
}: TextProps &
  HTMLProps<HTMLParagraphElement> &
  VariantProps<typeof textStyles>) => {
  return (
    <p
      className={cx(
        textStyles({
          variant,
          variantMobile,
          // fontColor,
          // fontFamily,
        }),
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;

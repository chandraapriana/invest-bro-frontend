import Text from "@/components/atoms/Text";
import React from "react";

const MainText = () => {
  return (
    <div className="flex flex-col w-full my-10 max-w-[800px]">
      <Text variant={"body700"} className="text-center font-bold">
        Invetasi Sejak Dini, Biar Anak Anda Tidak Gen Sandwich
      </Text>
      <Text variant={"body500"} className="text-center">
        Simulasi investasi otomatis kamu pakai kalkulator DCA untuk saham AS,
        saham Indo, crypto, & emas. Lihat potensi cuan masa depan dan bikin
        strategi anti ribet!
      </Text>
    </div>
  );
};

export default MainText;

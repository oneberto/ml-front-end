import { Metadata } from "next";
import Gallery from "./components/gallery";
import MainInformation, {
  MainInformationProps,
} from "./components/main-information";
import Divider from "@/components/divider";
import Specs from "./components/specs";
import Details from "./components/details";
import Description from "./components/description";
import Sidebar, { SidebarProps } from "./components/sidebar";
import CTACheckout from "./components/sidebar/cta-checkout";
import React from "react";
import { getProduct, getSeller } from "@/services/requests";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const product = await getProduct(id);

  return {
    title: product.title,
    description: "Comprar " + product.title,
  };
}

const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;

  const product = await getProduct(id);
  const seller = await getSeller(product.sellerId);

  const {
    condition,
    sales,
    title,
    rating,
    variations,
    specs,
    details,
    description,
    delivery,
  } = product;

  const mainInformationProps: MainInformationProps = {
    seller,
    condition,
    sales,
    title,
    rating,
    variations,
    id,
  };

  const sidebarProps: SidebarProps = {
    seller,
    delivery,
    id,
  };

  return (
    <>
      <div className="container py-6">
        <div className="flex flex-col xl:flex-row rounded bg-white p-6 gap-6">
          <div id="content" className="w-full h-fit">
            <div className="flex flex-col xl:flex-row gap-6">
              <Gallery images={product.gallery} />

              <MainInformation {...mainInformationProps} />

              <CTACheckout className="block xl:hidden" />
            </div>

            <Divider />

            <Specs specs={specs} />

            <Divider />

            <Details details={details} />

            <Divider />

            <Description description={description} />
          </div>

          <Sidebar {...sidebarProps} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

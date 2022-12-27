import CarauselLayout from "@components/layouts/carausel/layout";
import { getCarouselItems } from "@core/staticfiles";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Carousel({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { items } = data
    return <CarauselLayout items={items}><div>carousel</div></CarauselLayout>
}
interface Props {
    data: {
        items: string[]
    }
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req, res, locale } = context;
    const items = getCarouselItems()
    return {
        props: {
            data: { items }
        },
    };
}
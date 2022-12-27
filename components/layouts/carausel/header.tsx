import BaseHeader from "@components/cards/layout/header/BaseHeaderCard";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
    enable: boolean,
    toggleFooter: () => void
}
export default function Header({ enable, toggleFooter }: HeaderProps) {
    if (enable)
        return (
            <BaseHeader toggleFooter={toggleFooter} />
        )
    else
        return (<></>)
}
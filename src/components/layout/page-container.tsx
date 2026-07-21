import { ReactNode } from "react";

type Props = {

children: ReactNode;

};

export default function PageContainer({

children,

}: Props) {

return (

<div className="flex">

{children}

</div>

);

}
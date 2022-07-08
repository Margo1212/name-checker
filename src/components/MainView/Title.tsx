import { ReactNode } from "react"

type TitleProps = {
  children?: ReactNode;
}

const Title = ({children} : TitleProps) => {
  return (
    <h1 className="text-white text-5xl font-bold m-10">{children}</h1>
  )
}

export default Title
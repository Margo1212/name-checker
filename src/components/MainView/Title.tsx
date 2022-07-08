import { ReactNode } from "react"

type TitleProps = {
  children?: ReactNode;
}

const Title = ({children} : TitleProps) => {
  return (
    <div>{children}</div>
  )
}

export default Title
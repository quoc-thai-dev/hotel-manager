
interface TitleProp{
    text:string
    color:string
}

function Title ({text,color}:TitleProp) {
  return (
    <p className={`${color} font-bold text-3xl mb-10`}>{text}</p>
  )
}

export default Title  
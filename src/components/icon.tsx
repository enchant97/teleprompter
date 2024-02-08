import feather from 'feather-icons';

const ICON_SIZE_DEFAULT = 20

type IconProps = {
  name: string
  size?: number
}

export default function Icon(props: IconProps) {
  return (
    <svg
      width={props.size || ICON_SIZE_DEFAULT}
      height={props.size || ICON_SIZE_DEFAULT}
      fill="none"
      stroke="currentColor"
      stroke-width={"2"}
      stroke-linecap="round"
      stroke-linejoin="round"
      viewBox="0 0 24 24"
      innerHTML={feather.icons[props.name].contents}
    />
  )
}

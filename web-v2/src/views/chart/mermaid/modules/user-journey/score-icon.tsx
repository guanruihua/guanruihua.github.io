export interface ScoreIconProps {
  score: number
  [key: string]: any
}

export function ScoreIcon(props: ScoreIconProps) {
  const { score = 3 } = props
  const className =
    props.className +
    [
      //
      '',
      ' top-[80%]',
      ' top-[70%]',
      ' top-[60%]',
      ' top-[50%]',
      ' top-[40%]',
    ][score]

  if (score < 3) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 36 36"
      >
        <path
          fill="currentColor"
          d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m9 12.28a1.8 1.8 0 1 1-1.8-1.8a1.8 1.8 0 0 1 1.8 1.8m-15.55 1.8a1.8 1.8 0 1 1 1.8-1.8a1.8 1.8 0 0 1-1.84 1.8Zm14 7.53a1 1 0 0 1-1.6 1.2a7 7 0 0 0-11.31.13a1 1 0 1 1-1.63-1.16a9 9 0 0 1 14.54-.17"
          className="clr-i-solid clr-i-solid-path-1"
        ></path>
        <path fill="none" d="M0 0h36v36H0z"></path>
      </svg>
    )
  }
  if (score > 3) {
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16m3.536-4.464a.75.75 0 1 0-1.061-1.061a3.5 3.5 0 0 1-4.95 0a.75.75 0 0 0-1.06 1.06a5 5 0 0 0 7.07 0M9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5m3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5s.448 1.5 1 1.5"
          clipRule="evenodd"
        ></path>
      </svg>
    )
  }
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M6 8c.552 0 1-.672 1-1.5S6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8m5-1.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5m-5.75 4a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

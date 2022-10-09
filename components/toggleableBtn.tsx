interface ToggleableBtnProps<T> {
  currentValue: T | undefined;
  desiredValue: T;
  set: (val: T | undefined) => void;
  text: string;
}

function ToggleableBtn<T>({
  currentValue,
  desiredValue,
  set,
  text,
}: ToggleableBtnProps<T>): JSX.Element {
  return (
    <button
      className={"btn " + (currentValue === desiredValue ? "btn-active" : "")}
      onClick={() =>
        set(currentValue === desiredValue ? undefined : desiredValue)
      }
    >
      {text}
    </button>
  );
}

export default ToggleableBtn;

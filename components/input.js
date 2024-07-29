import React from "react";

const FormInput = ({
  inputLabel,
  placeholder,
  type,
  id,
  value,
  setValue,
  icon,
  isDisabled,
  className,
  handleOnchage,
  handleOnKeyPress,
  hasOnchage,
  helperText,
  variant
}) => {
  return (
    <div className={`relative flex flex-col gap-[10px]`}>
      {inputLabel && <label htmlFor={id}>{inputLabel}</label> }
      <input
        type={type}
        id={id}
        variant={variant}
        placeholder={placeholder}
        value={value}
        className="flex w-full font-[400] control--pot text-base text-pageBG border-b text-[18px] py-[10px] border-pageText bg-transparent transition-colors file:border-0 file:bg-transparent text-gray-900 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(e) => {
          if (hasOnchage) {
            //@ts-ignore
            handleOnchage(e);
          } else {
            //@ts-ignore
            setValue(e.target.value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
                //@ts-ignore
            handleOnKeyPress(e);
          }
        }}
        disabled={isDisabled}
      />
      {(!variant && icon) && <div className="text-grey-30 scale-[0.7] absolute right-3 top-[50%] -translate-y-[50%]">{icon}</div>}
      {variant === "outlineLight" &&  <div className="text-grey-30 scale-[0.7] absolute -right-1 top-[10%]">{icon}</div> }
      {variant === "outlineDark" &&  <div className="text-black-10 scale-[0.7] absolute -right-1 top-[10%]">{icon}</div> }

      {helperText && (
        <p className="text-xs text-muted-foreground font-normal pt-[4px]">
          {helperText}
        </p>
      )}
      {/* {error && error.id === id && (
        <div className="flex items-center justify-start mt-1 gap-1">
          <AlertCircle size={12} color="#CF222E" />
          <p className="font-normal text-[#CF222E] text-sm leading-[18px]">
            {error.message}
          </p>
        </div>
      )} */}
    </div>
  );
};

export default FormInput;

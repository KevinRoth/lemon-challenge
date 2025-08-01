import { Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type:
    | "title"
    | "title-2"
    | "headline"
    | "body-1"
    | "body-2"
    | "custom"
    | "small"
    | "medium";
  color?: string;
  customType?: string;
};

export function ThemedText({
  type = "body-1",
  color = "text-secondary-500",
  className = "",
  customType = "",
  ...rest
}: ThemedTextProps) {
  const getFontType: Record<ThemedTextProps["type"], string> = {
    title: "text-xl font-medium",
    headline: "text-4xl font-bold",
    "title-2": "text-xl font-semibold",
    "body-1": "text-lg font-medium",
    "body-2": "text-lg font-semibold",
    medium: "text-md font-medium",
    small: "text-xs font-medium",
    custom: customType,
  };

  return (
    <Text className={`${className} ${color} ${getFontType[type]}`} {...rest} />
  );
}

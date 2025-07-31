import type { InjectionKey } from "vue";
import type { FormFieldContext, TabsContext } from "@/shared/contexts";

export const Tabs = Symbol("TabsContext") as InjectionKey<TabsContext>;
export const FormField = Symbol("UFormFieldContext") as InjectionKey<FormFieldContext>;

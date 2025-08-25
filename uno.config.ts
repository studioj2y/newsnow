import { defineConfig, presetIcons, presetWind3, transformerDirectives, transformerVariantGroup } from "unocss"
import { hex2rgba } from "@unocss/rule-utils"
import { sources } from "./shared/sources"

export default defineConfig({
  mergeSelectors: false,
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  rules: [
    [/^sprinkle-(.+)$/, ([_, d], { theme }) => {
      // @ts-expect-error >_<
      const hex: any = theme.colors?.[d]?.[400]
      if (hex) {
        return {
          "background-image": `radial-gradient(ellipse 80% 80% at 50% -30%,
         rgba(${hex2rgba(hex)?.join(", ")}, 0.3), rgba(255, 255, 255, 0));`,
        }
      }
    }],
    [
      "font-brand",
      {
        "font-family": `"Baloo 2", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace; `,
      },
    ],
  ],
  shortcuts: {
    "color-base": "color-neutral-800 dark:color-neutral-300",
    "bg-base": "bg-zinc-200 dark:bg-dark-600",
    "btn": "op50 hover:op85 cursor-pointer transition-all",
  },
  safelist: [
    ...["milkyorange", ...new Set(Object.values(sources).map(k => k.color))].map(k =>
      `bg-${k} color-${k} border-${k} sprinkle-${k} shadow-${k}
       bg-${k}-500 color-${k}-500
       dark:bg-${k} dark:color-${k}`.trim().split(/\s+/)).flat(),
  ],
  extendTheme: (theme) => {
    // @ts-expect-error >_<
    theme.colors.milkypurple = {
    400: '#c9c9ea',
    500: '#8b98e3',
  }
    theme.colors.milkyred = {
    400: '#fec2dc',
    500: '#fea0bf',
  }      
    theme.colors.milkygreen = {
    400: '#e7e4af',
    500: '#b9c97b',
  }       
    theme.colors.milkyblue = {
    400: '#b6d4ec',
    500: '#ddf3fe',
  }   
    theme.colors.milkygrey = {
    400: '#edede8',
    500: '#e5e5e5',
  }   
    theme.colors.milkyorange = {
    400: '#edd3c2',
    500: '#fc9f66',
  }   
    theme.colors.primary = theme.colors.milkypurple
      return theme
  },
})

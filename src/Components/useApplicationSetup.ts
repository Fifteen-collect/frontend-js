import * as Types from "Types";

export default () => {
  const availableSizes = (Object.values(Types.Block.Size) as Types.Block.Size[]).filter(s => typeof s === 'number');
  const availableMethods: Types.Method[] = Object.values(Types.Method);
  const availableThemes: Types.Theme[] = Object.values(Types.Theme);

  return {
    availableSizes,
    availableMethods,
    availableThemes,
  }
}

import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  rollup: {
    inlineDependencies: true,
    emitCJS: true
  },
  declaration: true,
  clean: true
})

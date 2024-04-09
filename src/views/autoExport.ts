/**
* 利用 import.meta.glob 动态加载所有 vue 文件
*/

export default async function test() {
  const viewsVues = import.meta.glob('./**/*.vue', { eager: true });
  // const res: any[] =  await Promise.all(Object.entries(viewsVues).map(async ([path, value]) => {
  //   const { cusOptions } = value.default;
  //   // Extract view path from file path
  //   const viewPath = path.match(/\.\/(.*?)\.vue/)?.[1] ?? "";
  //   return {
  //     ...cusOptions,
  //     path: viewPath,
  //   }
  // }))
  // // Merge individual objects into a single result object
  // console.log(res.filter(item=> item.show));
  // return res;
}
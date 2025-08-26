// Example plugin (ES module)
export default async function init(ctx = {}) {
  console.log('[example plugin] init called with env NODE_ENV=' + (ctx.env?.NODE_ENV || 'unknown'));
  // Plugin can return cleanup/dispose function if needed
  return () => console.log('[example plugin] disposed');
}

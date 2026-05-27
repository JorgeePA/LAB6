const core = require('@actions/core');

try {
  const tipoRelease = core.getInput('tipo-release');
  const prefijo = core.getInput('prefijo');

  const tiposValidos = ['major', 'minor', 'patch'];
  if (!tiposValidos.includes(tipoRelease)) {
    core.setOutput('es-valido', 'false');
    core.setFailed(`Input inválido: "${tipoRelease}". Debe ser major, minor o patch.`);
    process.exit(1);
  }

  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');

  let mayor = 1, menor = 0, parche = 0;
  if (tipoRelease === 'major') { mayor = 2; }
  if (tipoRelease === 'minor') { menor = 1; }
  if (tipoRelease === 'patch') { parche = 1; }

  const version = `${prefijo}${mayor}.${menor}.${parche}`;
  const versionConFecha = `${version}-${anio}${mes}${dia}`;

  core.setOutput('version', version);
  core.setOutput('version-con-fecha', versionConFecha);
  core.setOutput('es-valido', 'true');

  core.info(`Tipo de release: ${tipoRelease}`);
  core.info(`Versión generada: ${version}`);
  core.info(`Versión con fecha: ${versionConFecha}`);

} catch (error) {
  core.setFailed(`Error inesperado: ${error.message}`);
}

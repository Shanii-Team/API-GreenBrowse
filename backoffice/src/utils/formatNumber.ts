/**
 * Formate les nombres pour un affichage optimal
 */
export function formatNumber(value: number, type: 'co2' | 'generic' = 'generic'): string {
  if (isNaN(value) || value === 0) return '0';

  if (type === 'co2') {
    if (value < 0.001) {
      // Très petites valeurs en mg
      return `${Math.round(value * 1000000)} mgCO₂e`;
    } else if (value < 1) {
      // Valeurs en grammes
      return `${Math.round(value * 1000)} gCO₂e`;
    } else if (value < 1000) {
      // Valeurs en kg avec décimales
      return `${value.toFixed(3)} kgCO₂e`;
    } else if (value < 1000000) {
      // Grandes valeurs en kg
      return `${Math.round(value)} kgCO₂e`;
    } else {
      // Très grandes valeurs en tonnes
      return `${(value / 1000).toFixed(2)} tCO₂e`;
    }
  }

  // Formatage générique avec séparateurs de milliers
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  } else if (value >= 1) {
    return value.toFixed(2);
  } else {
    return value.toFixed(4);
  }
}

/**
 * Détermine la classe CSS pour la taille du texte selon la longueur
 */
export function getTextSizeClass(text: string): string {
  const length = text.length;
  
  if (length > 20) {
    return 'text-lg lg:text-xl';
  } else if (length > 15) {
    return 'text-xl lg:text-2xl';
  } else if (length > 10) {
    return 'text-2xl lg:text-3xl';
  } else {
    return 'text-3xl lg:text-4xl';
  }
}
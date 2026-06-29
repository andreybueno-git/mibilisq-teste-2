export function filterProducts(products, category, query) {
  const normalized = query.trim().toLocaleLowerCase("pt-BR");

  return products.filter((product) => {
    const categoryMatches =
      category === "Todas" || product.category === category;
    const queryMatches =
      normalized.length === 0 ||
      product.name.toLocaleLowerCase("pt-BR").includes(normalized);

    return categoryMatches && queryMatches;
  });
}

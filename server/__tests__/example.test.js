function soma(a, b) {
  return a + b;
}

test('se eu enviar 4 e 5 ele some os dois numeros', () => {
  const result = soma(4, 5);
  expect(result).toBe(9);
});

#include <stdio.h>
#include "libmy.h"

void main() {
  int x, y;
  print("Input two numbers : ");
  scanf("%d %d", &x, &y);
  print("%d + %d = %d\n", x, y, plus(x, y));
  print("%d - %d = %d\n", x, y, minus(x, y));
}

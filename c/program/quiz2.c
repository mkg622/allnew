#include <stdio.h>
#include "libcheckprime.a"

void main() {
  int n;
  printf("input Number : ");
  scanf("%d" ,&n);
  if(checkprim(n) == 0)
  printf("%d is prime number~!! \n" , n);
else
  printf("%d is not prime number~!! \n" , n);
}

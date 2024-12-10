[JC](/index.html) [Index](/index.html) [Projects](/projects.html) [Trips](/trips.html) [Notes](/notes.html) [Jacob](/about.html)

Accent Primary

Accent Primary

Accent Teritiary

Bar Primary

Bar Primary Hover

Bar Primary Active

Bar Secondary

Text Standard

```
// From https://en.wikipedia.org/wiki/Quicksort
// Sorts a (portion of an) array, divides it into partitions, then sorts those
algorithm quicksort(A, lo, hi) is 
  if lo >= 0 && hi >= 0 && lo < hi then
    p := partition(A, lo, hi) 
    quicksort(A, lo, p) // Note: the pivot is now included
    quicksort(A, p + 1, hi) 

// Divides array into two partitions
algorithm partition(A, lo, hi) is 
  // Pivot value
  pivot := A[ floor((hi + lo) / 2) ] // The value in the middle of the array

  // Left index
  i := lo - 1 

  // Right index
  j := hi + 1

  loop forever 
    // Move the left index to the right at least once and while the element at
    // the left index is less than the pivot
    do i := i + 1 while A[i] < pivot
    
    // Move the right index to the left at least once and while the element at
    // the right index is greater than the pivot
    do j := j - 1 while A[j] > pivot

    // If the indices crossed, return
    if i >= j then return j
    
    // Swap the elements at the left and right indices
    swap A[i] with A[j]
```

### Some Links

- [Indeterminate Checkboxes](https://css-tricks.com/indeterminate-checkboxes/)
- [No-JS Dark Mode](https://endtimes.dev/no-javascript-dark-mode-toggle/)

### Others' Snippets

- [Burning Ink](https://codepen.io/matteo1222-the-selector/pen/BarWzMp)

[Button A](/index.html)

[Button B](/index.html)

[**Nice Software**
\
2022-08-16](/notes/nice_software.html)

[**Handy**
\
2022-08-15](/notes/handy.html)

JC

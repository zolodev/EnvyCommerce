---
# Identifier, could be used for SKU
id: 12

# publish has to be set "yyyy-mm-dd" required for the product to be visible
published: "2021-05-01"

# [Optional] unpublished "yyyy-mm-dd", will not be visiable from the unpublished date
# unpublish: "2021-05-15"

# Name is used in Title and slug
name: Example Markdown

# Used as a short description & excerpt
description: Test document to see what markdown can be used.

# Will be converted to the local configuration
price: 99
---

## Nike Air Pegasus

Embed a youtube clip example

[![NextJS Course](https://img.youtube.com/vi/mTz0GXj8NN0/0.jpg)](https://www.youtube.com/watch?v=mTz0GXj8NN0 "NextJS Course")

The content of the pegasus can be written here...

| Name  | Age |
| ----- | --- |
| Fred  | 29  |
| Jim   | 47  |
| Harry | 32  |

\*asterisks, not emphasis\*

_emphasis, not asterisks_

The _quick_ brown fox, jumped **over** the lazy [dog](https://en.wikipedia.org/wiki/Dog).

[foo1](/url1)
[foo2](/url2)

![m'lady](https://i.imgur.com/v8IVDka.jpg)

- Milk
- Bread
  - Wholegrain
- Butter

> To be or not to be, that is the question.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a     | b     | b-c     |     c |   d   |
| ----- | :---- | ------- | ----: | :---: |
| Hello | Bello | Awesome | cello | dello |

## Tasklist

- [ ] to do
- [x] done

---

---

---

===

+++

1. Tidy the kitchen
2. Prepare ingredients
3. Cook delicious things

**The quick brown [fox][1], jumped over the lazy [dog][2].**

[1]: https://en.wikipedia.org/wiki/Fox "Wikipedia: Fox"
[2]: https://en.wikipedia.org/wiki/Dog "Wikipedia: Dog"

\~\~deleted words\~\~

==oooh fancy==

https://ghost.org

The quick brown fox[^1] jumped over the lazy dog[^2].

[^1]: Foxes are red
[^2]: Dogs are usually not red

```javascript
   [...]
```

// # Notifications API
// RESTful API for creating notifications
var Promise = require('bluebird'),
\_ = require('lodash'),
canThis = require('../permissions').canThis,
errors = require('../errors'),
utils = require('./utils'),

    // Holds the persistent notifications
    notificationsStore = [],
    // Holds the last used id
    notificationCounter = 0,
    notifications;

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following
equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

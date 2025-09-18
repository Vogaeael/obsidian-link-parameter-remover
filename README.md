# Link Parameter Remover
Obsidian extension to remove all or defined parameters of defined domain links.

## Features
### What it does
- Remove all parameter of configured domains
- Remove configured parameters of configured domains
- Remove all except configured parameters on configured domains

### Where it can be used
- On the selected text
- On the focused file
- On all markdown files in the vault

## Settings
### Domains
Here you should add the domains, on which you want to remove the parameter. They are divided by next line.

for Example
```
https://www.first-domain.com
https://second-domain.net
```

### Parameters
If you want to remove only specific parameters, or you want to keep specific parameters you should add `|` after the domain and add the parameter keys divided by `;`.

for Example
```
https://www.first-domain.com|param1
https://second-domain.net|param2;param3
```

After the parameters, you should add again `|` and add a `+` if you want to keep the configured parameters, or a `-` if you want to remove only the configured parameters.
If you don't add the `|` and `+` or `-` it will handle like you add it with `-`. That is done to keep it downwards compatible.

for Example
```aiignore
https://www.first-domain.com|param1|+
https://second-domain.net|param2;param3|-
```

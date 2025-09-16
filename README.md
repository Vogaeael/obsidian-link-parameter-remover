# Link Parameter Remover
Obsidian extension to remove all or defined parameters of defined domain links.

## Features
- Removes the all or configured parameters of configured domains in the selected text
- Removes the all or configured parameters of configured domains in the focused file
- Removes the all or configured parameters of configured domains in all markdown files in the vault

## Settings
### Domains
Here you should add the domains, on which you want to remove the parameter. They are divided by next line.

for Example
```
https://www.first-domain.com
https://second-domain.net
```

### Parameters
If you only want to remove specific parameters, you should add `|` after the domain and add the parameter keys divided by `;`.

for Example
```aiignore
https://www.first-domain.com|param1
https://second-domain.net|param2;param3
```

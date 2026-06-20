import pathlib
import re

root = pathlib.Path(r"c:\Users\Surface\Desktop\homefy-next-ts-ui\app\tools\Redux\ActionTypes")
pattern = re.compile(r"^export const (?P<name>[A-Z0-9_]+)\s*=\s*(?P<value>'[^']+')(\s*//.*)?$", re.MULTILINE)

for path in sorted(root.glob('*.ts')):
    text = path.read_text(encoding='utf-8')
    def repl(m):
        comment = m.group(3) or ''
        return f"export const {m.group('name')}: {m.group('value')} = {m.group('value')}{comment}"
    new = pattern.sub(repl, text)
    if new != text:
        path.write_text(new, encoding='utf-8')
        print(f'Updated {path.name}')

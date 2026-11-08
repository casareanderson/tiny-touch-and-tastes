import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def _load_json(name):
    with open(ROOT / name, encoding="utf-8") as f:
        return json.load(f)


def test_babel_parser_stays_on_major_7():
    lock = _load_json("package-lock.json")
    pkg = lock["packages"]["node_modules/@babel/parser"]
    assert pkg["version"].startswith("7.")


def test_babel_types_stays_on_major_7():
    lock = _load_json("package-lock.json")
    pkg = lock["packages"]["node_modules/@babel/types"]
    assert pkg["version"].startswith("7.")


def test_no_overrides_force_babel_8():
    manifest = _load_json("package.json")
    overrides = manifest.get("overrides", {})
    for name in overrides:
        assert not name.startswith("@babel/"), name

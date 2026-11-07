import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def _load_json(name):
    with open(ROOT / name, encoding="utf-8") as f:
        return json.load(f)


def test_babel_helper_validator_identifier_is_upgraded():
    lock = _load_json("package-lock.json")
    pkg = lock["packages"]["node_modules/@babel/helper-validator-identifier"]
    assert pkg["version"] == "8.0.6"
    assert "8.0.6" in pkg["resolved"]


def test_override_pins_the_new_major():
    manifest = _load_json("package.json")
    assert manifest["overrides"]["@babel/helper-validator-identifier"] == "8.0.6"


def test_babel_types_and_parser_move_to_8x():
    lock = _load_json("package-lock.json")
    assert (
        lock["packages"]["node_modules/@babel/types"]["version"] == "8.0.6"
    )
    assert (
        lock["packages"]["node_modules/@babel/parser"]["version"] == "8.0.6"
    )

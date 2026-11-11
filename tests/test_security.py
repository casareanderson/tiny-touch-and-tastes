import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"


def _source_files():
    for path in SRC.rglob("*"):
        if path.is_file() and path.suffix in {".ts", ".js", ".mjs", ".astro"}:
            yield path


def test_no_unvalidated_container_exec_calls():
    """Guards against remote command execution in the worker runtime.

    The worker's Container.exec(cmd, ...) accepts a command array; if any
    user-controlled input ever reaches that array, an attacker could run
    arbitrary commands. The audit found no exec() call sites today, so this
    test fails the moment an unvalidated .exec() call is introduced.
    """
    exec_call = re.compile(r"\.\s*exec\s*\(")
    offenders = [
        str(path.relative_to(ROOT))
        for path in _source_files()
        if exec_call.search(path.read_text(encoding="utf-8"))
    ]
    assert not offenders, (
        "Container.exec() must never receive user-controlled input. "
        f"Unvalidated .exec() calls found in: {offenders}"
    )

#!/bin/bash

# Script para verificar qué proyectos han tenido cambios desde el último commit

# Obtener los proyectos disponibles
PROJECTS=$(ls -d apps/*/ | cut -d'/' -f2)

echo "Verificando cambios en los proyectos..."
echo "----------------------------------------"

for PROJECT in $PROJECTS; do
  # Verificar si hay cambios en la carpeta del proyecto
  if git diff --quiet HEAD^ HEAD -- apps/$PROJECT; then
    echo "✓ $PROJECT: Sin cambios"
  else
    echo "⚠ $PROJECT: Tiene cambios que serán desplegados"
  fi
done

echo "----------------------------------------"
echo "Nota: Este script compara los cambios entre el commit actual y el anterior."
echo "      Para comprobar cambios no commitados, use git status." 
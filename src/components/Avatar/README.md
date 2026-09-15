# Avatar Foundation

`PlayerProfile` stores only identity (`id`, `displayName`) and a `PlayerAvatar` selection. The avatar selection stores stable AvatarAsset IDs by slot; the catalog remains separate content.

The current slots are `BODY`, `EYES`, `TOP`, and `HAIR`. `getAvatarLayers` resolves selected IDs from the catalog and renders the deterministic order `BODY → EYES → TOP → HAIR`, independent of catalog order. Future assets and slots extend the catalog/model; `PlayerAvatar` renders resolved layers without asset-specific conditionals.